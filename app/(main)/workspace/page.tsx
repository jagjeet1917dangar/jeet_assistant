import React from 'react'
import AssistantList from './_components/AssistantList';

function Workspace() {
  return (
    <div className='h-screen fixed w-full'>
      <div className='grid grid-cols-5'>
        <div className='hidden md:block'>
            <AssistantList/>
            {/* Assistant List */}
        </div>
        <div className='md:col-span-4 lg:col-span-3'>
            {/* Chat Ui */}
            CHAT UI
        </div>
        <div className='hidden lg:block'>
            SETTINGS
            {/* Settings */}
        </div>
      </div>
    </div>
  )
}

export default Workspace;
