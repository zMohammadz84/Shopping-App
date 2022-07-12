const Input = ({ name, label, type = "text", formik }) => {
  return (
    <div className="min-h-[88px]">
      <div className="flex items-center gap-x-5">
        <label htmlFor={name}>{label} :</label>
      </div>
      <input
        className=" px-2 py-1 w-full mt-2 rounded-sm block outline outline-1 outline-slate-300 focus:outline-violet-500 focus:outline-2"
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        {...formik.getFieldProps(name)}
        id={name}
        placeholder={`Please Enter ${label}`}
      />
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-red-500">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default Input;
