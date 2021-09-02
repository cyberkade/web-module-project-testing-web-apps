import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent';

test('renders without errors', ()=>{
    render(<ContactForm />) 
});

test('renders the contact form header', ()=> {
    render(<ContactForm />) 
    const header = screen.getByText(/contact form/i)
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByPlaceholderText('Edd')
    userEvent.type(firstName, 'Kade')
    expect(screen.getByText(/error: firstName must have at least 5 characters./i))
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const submitBtn = screen.getByTestId('submit')
    userEvent.click(submitBtn)
    expect(screen.getByText(/error: firstName must have at least 5 characters./i))
    expect(screen.getByText(/error: lastName is a required field./i))
    expect(screen.getByText(/error: email must be a valid email address./i))
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByPlaceholderText('Edd')
    userEvent.type(firstName, 'Kader')
    const lastName = screen.getByPlaceholderText('Burke')
    userEvent.type(lastName, 'Griffith')
    const submitBtn = screen.getByTestId('submit')
    userEvent.click(submitBtn)
    expect(screen.getByText(/error: email must be a valid email address./i))
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.getByLabelText('Email*')
    userEvent.type(email, 'jumbobumbo#gmail.com')
    expect(screen.getByText(/error: email must be a valid email address./i))
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const firstName = screen.getByPlaceholderText('Edd')
    userEvent.type(firstName, 'Kader')
    const email = screen.getByLabelText('Email*')
    userEvent.type(email, 'jumbobumbo@gmail.com')
    const submitBtn = screen.getByTestId('submit')
    userEvent.click(submitBtn)
    expect(screen.getByText(/error: lastName is a required field./i))
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText('First Name*')
    userEvent.type(firstName, 'Kader')
    const lastName = screen.getByLabelText('Last Name*')
    userEvent.type(lastName, 'Griffith')
    const email = screen.getByLabelText('Email*')
    userEvent.type(email, 'jumbobumbo@gmail.com')
    const submitBtn = screen.getByTestId('submit')
    userEvent.click(submitBtn)
    expect(screen.getByText('Kader').toBeInTheDocument)
    expect(screen.getByText('Griffith').toBeInTheDocument)
    expect(screen.getByText('jumbobumbo@gmail.com').toBeInTheDocument)
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText('First Name*')
    userEvent.type(firstName, 'Kader')
    const lastName = screen.getByLabelText('Last Name*')
    userEvent.type(lastName, 'Griffith')
    const email = screen.getByLabelText('Email*')
    userEvent.type(email, 'jumbobumbo@gmail.com')
    const message = screen.getByLabelText('Message')
    userEvent.type(message, 'Humbo Wumbo!')
    const submitBtn = screen.getByTestId('submit')
    userEvent.click(submitBtn)
    expect(screen.getByTestId('firstnameDisplay').toBeVisible)
    expect(screen.getByTestId('lastnameDisplay').toBeVisible)
    expect(screen.getByTestId('emailDisplay').toBeVisible)
    expect(screen.getByTestId('messageDisplay').toBeVisible)
});