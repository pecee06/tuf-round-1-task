const Button = ({
    label,
    f=()=>{},
    className=""
}) => {
  return (
    <button onClick={f} className={`${className}`}>{label}</button>
  )
}

export default Button