const LabelValue = ({ label, value, reverse = false, valueSize='text-xl' }) => {
  return (
    <div className={`flex items-end ${reverse && 'flex-row-reverse'} gap-x-1 w-fit text-light/50`}>
      {label}
      <span className={`text-accent ${valueSize}`}>
        {value}
      </span>
    </div>
  )
}

export default LabelValue
