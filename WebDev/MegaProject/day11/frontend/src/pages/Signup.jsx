import { useForm } from "react-hook-form";

  

function Signup(){
const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const handleeSubmit = (data)=>{
        console.log(data)
    }

    return(
        
        <>

            <form onSubmit={handleSubmit(handleeSubmit)}>
                <input  defaultValue="" {...register("name")} />
                <input  defaultValue="" {...register("email")} />
                <input  defaultValue="" {...register("password")} />
                <input type="submit" />
            </form>
            
        </>
    )
}

export default Signup