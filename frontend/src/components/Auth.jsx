import { useForm } from "react-hook-form"
import {Input, Button} from "../components/components"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { useCallback, useState } from "react"
import authService from "../api/authService"

const Auth = ({hideModal=()=>{}}) => {
  const { handleSubmit, setValue, formState, register } = useForm({
    defaultValues: {
      username: "",
      password: ""
    }
  })
  const { errors } = formState
  const [showPassword, setShowPassword] = useState(false)

  const Eye = useCallback(() => {
    if (!showPassword)
      return (
        <IoEye
          className="text-xl cursor-pointer"
          onClick={() => {
            setShowPassword(true)
          }}
        />
      )
    return (
      <IoEyeOff
        className="text-xl cursor-pointer"
        onClick={() => {
          setShowPassword(false)
        }}
      />
    )
  }, [showPassword])

  const requiredCheck = {
    required: {
      value: true,
      message: "This is a required field"
    }
  }

  return (
      <form noValidate className="flex flex-col gap-4">
        <Input
          error={errors.username}
          placeholder="* Username"
          {...register("username", requiredCheck)}
        />

        <Input
          error={errors.password}
          type={showPassword ? "text" : "password"}
          placeholder="* Password"
          {...register("password", {
            ...requiredCheck,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-+_])[^\s]{8,}$/,
              message:
                "Password should contain at least 1 lowercase, uppercase, special character and should at least be 8 characters long"
            }
          })}
        >
          <Eye />
        </Input>
        <div className="flex justify-between px-4">
          <Button
            label="Signup"
            className="p-2 rounded text-white hover:bg-slate-700 bg-slate-800 transition-all"
            f={handleSubmit((formData) => {
              authService
              .signup({
                username: formData.username,
                password: formData.password
              })
              .then(res => {
                console.log(res)
              })
              .catch(error => console.error(error))
              .finally(()=>{
                setValue("username","")
                setValue("password","")
                hideModal()
              })
            })}
          />
          <Button
            label="Login"
            className="p-2 rounded text-white hover:bg-slate-700 bg-slate-800 transition-all"
            f={handleSubmit((formData) => {
              authService
              .login({
                username: formData.username,
                password: formData.password
              })
              .then(res => {
                console.log(res)
              })
              .catch(error => console.error(error))
              .finally(()=>{
                setValue("username","")
                setValue("password","")
                hideModal()
              })
            })}
          />
        </div>
      </form>
  )
}

export default Auth