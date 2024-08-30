import React from 'react'

import { Search } from 'lucide-react'

export const Input: React.FC = () => {
  return (
    <div className="flex flex-col relative w-full">
      <Search className="w-7 h-7 text-pink absolute top-1/2 left-8 transform -translate-y-1/2" />
      <input
        type="text"
        className="h-[75px] text-2xl font-medium px-20 rounded-radius-100 bg-light-pink placeholder:text-pink"
        placeholder="Procure por heróis"
      />
    </div>
  )
}
