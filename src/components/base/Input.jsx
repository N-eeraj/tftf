const Input = ({ ...props }) => {
  const trimInput = () => props.onBlur && props.onBlur(props.value.trim())
  const handleKeyDown = ({ key }) => key === 'Enter' && trimInput()

  return (
    <input {...props} className={`max-w-xs py-1 px-4 bg-black/20 focus:bg-black/40 text-light placeholder:text-light/50 border border-light focus:border-accent outline-none rounded-md caret-accent  ${props.disabled && 'cursor-not-allowed'}`} onChange={e => props.onChange(e.target.value)} onBlur={trimInput} onKeyDown={handleKeyDown} />
  )
}

export default Input
