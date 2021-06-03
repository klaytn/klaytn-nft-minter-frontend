import React from "react"
import { CardDeck } from "react-bootstrap"
import NFTCard from "./NFTCard"

export const NFTGroup = (props) => {
  const width = 4
  const [items, setItems] = React.useState([])

  React.useEffect(()=>{
    var arr = []
    var col = 0
    var row = 0
    props.nfts.forEach((e,i) => {
      col = i % width
      row = Math.floor(i / width)

      if( col === 0 ) {
        arr.push([])
      }
      arr[row].push(e)
    })
    if( props.nfts.length > 0 ) {
      col += 1
      if(col > 0) {
        for(var i = 0; i < width-col;i++) {
          arr[row].push({id:''})
        }
      }
    }

    setItems(arr)
  },[props.nfts])


  return (
    items.map((row,rowIdx) => {
      return <CardDeck key={`card-deck-row-${rowIdx}`} className='my-4'>
        {row.map((col,colIdx)=> {
          return <NFTCard key={`card-deck-row-${rowIdx}-col-${colIdx}`} nft={col} />
        })
      }
      </CardDeck>
    })
  )

}