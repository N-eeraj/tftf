import { useId } from 'react'

const Switch = ({ checked, label, onToggle }) => {
  const inputId = useId()

  return (
    <div className='flex justify-between items-center gap-x-2 w-full'>
      <label htmlFor={inputId} className='text-light cursor-pointer'>
        {label}
      </label>
      <label className={`w-24 aspect-[2.5] p-[6px] ${checked ? 'bg-accent' : 'bg-light/20'} rounded-full cursor-pointer`}>
        <input checked id={inputId} type='checkbox' className='hidden' onChange={onToggle} />
        <div className={`h-full aspect-square bg-light rounded-full ${checked && 'translate-x-[calc(84px-100%)]'} duration-200`} />
      </label>
    </div>
  )
}

export default Switch
