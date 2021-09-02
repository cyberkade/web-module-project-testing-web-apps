import { useState } from 'react';

const useForm = (obj) => {
    
    const [form, setForm] = useState(obj)

    return [form, setForm];
}

export default useForm;