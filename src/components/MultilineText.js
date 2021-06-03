import React from 'react'

export const MultilineText = (props) => {
  var sp = []
  if(props.text)
    sp = props.text.trim().split('\n');
  return (
    <div>
    {sp.map((x,i)=>{
      return <span key={`multiline-text-${i}`}>{x}{(sp.length-1)!==i &&<br/>}</span>
    })}
    </div>
  )
}
