import React from 'react';
import { useState } from 'react';

const useError = (obj) => {

    const [errors, setErrors] = useState(obj)
    
    return [errors, setErrors];
}

export default useError;