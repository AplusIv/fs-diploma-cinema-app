/* eslint-disable react/prop-types */
const SectionButtons = ({ handleRefresh, handleDBUpdate }) => {
  return (
    <fieldset className="conf-step__buttons text-center">
      <button type="button" className="conf-step__button conf-step__button-regular" onClick={handleRefresh}>Отмена</button> 
      <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" onClick={handleDBUpdate}/>
    </fieldset>
  )
}

export default SectionButtons