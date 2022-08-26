import { useEffect, useState } from "react";

export const useForm = ( initialForm: any = {}) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = ({ target }: any, parentField?: string) => {
        const { name, value } = target;
        if (parentField) {
            setFormState({
                ...formState,
                [parentField]: {
                    ...formState[parentField],
                    [ name ]: value
                }
            });
        }
        else {
            setFormState({
                ...formState,
                [ name ]: value
            });
        } 
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    useEffect(() => {
      return () => {
        onResetForm()
      }
    }, [])
    

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}