/* eslint-disable react/prop-types */
const SectionHeader = ({ name, isActiveHeaderState, handleClick }) => {
  return (
    <header className={ 
      isActiveHeaderState ? 
      "conf-step__header conf-step__header_opened" : 
      "conf-step__header conf-step__header_closed" 
      } 
      onClick={handleClick}>
      <h2 className="conf-step__title">{ name }</h2>
    </header>
  )
}

export default SectionHeader
