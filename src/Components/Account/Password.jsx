import React from 'react'

const Password = () => {


  const hanleSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
  }
  const handleChange = (e) => {
    e.preventDefault()
    console.log(e.target.id)
  }
  return (
    <div>
      <form
        onSubmit={hanleSubmit}
        onChange={handleChange}
      >
        <div className='flex gap-5 items-center'>
          <div className='ml-auto'>
            <label
              htmlFor='username'
            >
              Username
            </label>
          </div>
          <div className='w-5/6'>
            <input
              id='username'
              type='text'
              className='w-full outline-none border border-slate-300 px-3 py-2 '
            />
          </div>
        </div>
        <div className='flex gap-5 items-center'>
          <div className='ml-auto'>
            <label
              htmlFor='username'
            >
              Username
            </label>
          </div>
          <div className='w-5/6'>
            <input
              id='emal'
              type='text'
              className='w-full outline-none border border-slate-300 px-3 py-2 '
            />
          </div>
        </div>
        <button>submit</button>
      </form>
    </div>
  )
}

export default Password
