import React from 'react'
import { useRequestPlaygroundStore } from '../store/useRequestStore';
import RequestBar from './request-bar';
import RequestEditorArea from './request-editor-area';

const RequestEditors = () => {
    const { tabs, activeTabId, updateTab } = useRequestPlaygroundStore();
    const activeTab=tabs.find(t=>t.id===activeTabId ||tabs[0])
    if (!activeTabId) return null
  return (
    <div className='flex flex-col items-center justify-start py-4 px-4'>
        <RequestBar tab={activeTab} updateTab={updateTab} />
        <div className="flex flex-1 flex-col w-full justify-start items-center mt-4 ">
            <RequestEditorArea tab={activeTab} updateTab={updateTab} />
        </div>
    </div>
  )
}

export default RequestEditors