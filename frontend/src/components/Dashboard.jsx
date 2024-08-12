import { useForm } from "react-hook-form"
import {Input, Button} from "../components/components"
import cardService from "../api/cardService"

const Dashboard = ({hideModal=()=>{}, data={}}) => {
  const { handleSubmit, setValue, formState, register } = useForm({
    defaultValues: {
      term: data.term || "",
      definition: data.definition || ""
    }
  })
  const { errors } = formState

  const requiredCheck = {
    required: {
      value: true,
      message: "This is a required field"
    }
  }

  return (
    <form noValidate className="flex flex-col gap-4">
      <Input
        error={errors.term}
        placeholder="* Term"
        {...register("term", requiredCheck)}
      />

      <Input
        error={errors.definition}
        placeholder="* Definition"
        {...register("definition", requiredCheck)}
      />
      {
        Object.keys(data).length ?
        <Button
          label="Update"
          className="p-2 rounded text-white hover:bg-slate-700 bg-slate-800 transition-all"
          f={handleSubmit((formData) => {
            cardService
            .updateCard({
              id: data.id,
              newTerm: formData.term,
              newDefinition: formData.definition
            })
            .then(res => {
              console.log(res)
            })
            .catch(error => console.error(error))
            .finally(()=>{
              setValue("term",data.term || "")
              setValue("definition",data.definition || "")
              hideModal()
              location.reload()
            })
          })}
        />
      :
        <Button
          label="Create"
          className="p-2 rounded text-white hover:bg-slate-700 bg-slate-800 transition-all"
          f={handleSubmit((formData) => {
            cardService
            .createCard({
              term: formData.term,
              definition: formData.definition
            })
            .then(res => {
              console.log(res)
            })
            .catch(error => console.error(error))
            .finally(()=>{
              setValue("term","")
              setValue("definition","")
              hideModal()
              location.reload()
            })
          })}
        />
      }
    </form>
  )
}

export default Dashboard