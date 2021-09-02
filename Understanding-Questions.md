# Understanding Questions:
1. What are some possible tests for this application?
* The component correctly renders.
* An h1 element exists within the document containing the text "Contact Form"
* The user sees 3 error messages if they submit without typing anything
* The user sees *Error: firstName must have at least 5 characters.* if the first name field doesn't have at least 5 characters
* The user sees *Error: lastName is a required field.* if the last name field is empty on submit
* The user sees *Error: email must be a valid email address.* if the email field is empty on submit
* The user sees a reflection of their submitted information (no message required to submit)
* The user sees their message reflected if they type information into that message input