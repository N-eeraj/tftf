import LoadingAnimation from '@components/base/LoadingAnimation'

const Button = ({ loading, disabled, autoFocus, className, onClick, children }) => {
  return (
    <button disabled={loading || disabled} autoFocus={autoFocus} className={`relative py-2 px-4 font-bold rounded-full focus:outline-none ${loading ? 'cursor-progress' : 'disabled:grayscale disabled:cursor-not-allowed'} ${className}`} onClick={onClick}>
      {
        loading && <LoadingAnimation className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
      }
      <span className={loading ? 'invisible' : undefined}>
        {children}
      </span>
    </button>
  )
}

export default Button
