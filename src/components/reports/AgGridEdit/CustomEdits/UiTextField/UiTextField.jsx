import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

const UiTextField = memo(
  forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value);
    const refInput = useRef(null);

    // Cell Editor interface, that the grid calls
    useImperativeHandle(ref, () => {
      return {
        // the final value to send to the grid, on completion of editing
        getValue() {
          // this simple editor doubles any value entered into the input
          return value;
        },
      };
    });

    const onChangeListener = useCallback(
      (event) => setValue(event.target.value),
      []
    );
    const onKeyDownListener = useCallback(
      (event) => {
        if (event.key === 'Enter') {
          props.stopEditing();
        }
      },
      [props]
    );

    useEffect(() => {
      refInput.current.focus();
      // eslint-disable-next-line
    }, []);

    return (
      <input
        type="text"
        className="my-editor"
        ref={refInput}
        value={value}
        onChange={onChangeListener}
        onKeyDown={onKeyDownListener}
      />
    );
  })
);

export default UiTextField;
