import React from 'react';

import {useFormStatus} from "react-dom";
import { Button } from './ui/button';
const AuthButton = () => {
    const {pending} = useFormStatus();
  return (
    <Button
    disabled={pending}
    type="submit"
    className={`${pending ?"bg-gray-600":"bg-blue-600"} w-full py-2 px-4  text-white rounded-md hover:bg-blue-600`}
    
    >
      {pending?"Loading..." :"Login"}
      
    </Button>
  )
}

export default AuthButton
