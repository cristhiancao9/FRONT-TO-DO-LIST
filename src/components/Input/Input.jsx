import { useEffect, useRef, forwardRef, useState } from "react";
import classes from "./Input.module.css";

const { formItem, invalid: invalidCls, btn, formItem2 } = classes;

const Input = forwardRef(
  (
    {
      label = "",
      self = false,
      onLazyInput,
      info = "",
      invalid = "",
      actionBtn,
      type,
      tamaño,
      id: _id,
      ...input
    },
    ref
  ) => {
    const [timer, setTimer] = useState(null);
    const tam = tamaño;
    let inputRef = useRef(null);

    useEffect(() => {
      if (type === "email") {
        input.pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.source;
      }
    }, [input, type]);

    if (onLazyInput !== undefined) {
      const { callback, timeOut } = onLazyInput;

      if (callback !== undefined && timeOut !== undefined) {
        const onInputCallback = input?.onInput;

        input.onInput = (e) => {
          onInputCallback?.(e);

          if (timer) {
            clearTimeout(timer);
          }

          setTimer(
            setTimeout(() => {
              callback(e);
            }, timeOut)
          );
        };
      }
    }

    return self ? (
      <>
        {label && label !== "" && <label htmlFor={_id}>{label}</label>}
        <input id={_id} type={type} {...input} />
      </>
    ) : (
      <div className={tamaño === "min" ? formItem2 : formItem}>
        {label && label !== "" && <label htmlFor={_id}>{label}</label>}
        <div className={btn}>
          <input
            id={_id}
            type={type}
            {...input}
            ref={(realInput) => {
              inputRef.current = realInput;
              if (ref) {
                if (typeof ref === "function") {
                  ref(realInput);
                } else {
                  ref.current = realInput;
                }
              }
            }}
          />
          {info && <p>{info}</p>}
          {inputRef.current?.value !== "" && invalid && (
            <p className={`${invalidCls}`}>{invalid}</p>
          )}
          {actionBtn && (
            <button type="button" className={btn} onClick={actionBtn.callback}>
              {actionBtn.label}
            </button>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
