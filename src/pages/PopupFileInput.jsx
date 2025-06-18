/* eslint-disable react/prop-types */

const PopupFileInput = ({
  name, 
  type, 
  autoComplete, 
  edit = true, 
  required,
  onChangeCallback, 
}) => {

  return (
    <input
      className="popup__input"
      name={name}
      type={type}
      // value={null}
      autoComplete={autoComplete}
      onChange={(e) => {
        console.log(e.target.files);        
        onChangeCallback && onChangeCallback(e.target.files[0], name); // return a first object of of File List array
      }}
      disabled={!edit}
      required={required}>
    </input>
  )
}

export default PopupFileInput