import styled from 'styled-components'

export function MintCountInput({ mintCountStr, setMintCountStr }) {
  return <_MintCountInput
    type='number'
    min={1}
    max={10}
    step={1}
    pattern="[0-9]"
    onClick={e => {
      e.target.select()
    }}
    onChange={e => {
      const inputValue = e.target.value
      if (inputValue.indexOf('.') > -1) {
        setMintCountStr(inputValue.split('.')[0])
        return
      }
      if (inputValue === '') {
        return
      }
      const inputValueInt = parseInt(inputValue)
      if (isNaN(inputValue)) {
        return
      }
      if (inputValueInt > 10) {
        let toSet = inputValue % 10
        toSet = toSet == 0 ? 10 : toSet
        toSet = inputValue == 100 ? 10 : toSet
        toSet = toSet < 1 ? 1 : toSet
        setMintCountStr(toSet < 1 ? 1 : toSet)
        return
      }
      if (!e.target.validity.valid) {
        return
      }
      setMintCountStr(inputValue)
    }}
    value={mintCountStr}
  />
}

const _MintCountInput = styled.input`
  border: none;
  text-align: center;
  caret-color: transparent;
  height: 41px;
  border-radius: 10px;
  margin-left: 10px;
  padding-left: 14px;
  padding-right: 0;
  font-size: 18px;
  
  &::selection {
    background: transparent;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #73a3ff;
  }
`