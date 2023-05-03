export const GenSlider = (props) => {
  if (props.mode == 0) {
    return (
      <form>
        <select>
          <option value={0}>Uniform</option>
          <option value={1}>Random</option>
          <option value={2}>Timed</option>
        </select>
        <input
          type="range"
          min={props.min}
          max={props.max}
          id={props.varName}
          className="slider"
        />
      </form>
    );
  } else if (props.mode == 1) {
    return (
      <form>
        <select>
          <option value={0}>Uniform</option>
          <option value={1}>Random</option>
          <option value={2}>Timed</option>
        </select>
        <input
          type="range"
          min={props.min}
          max={props.max}
          id={props.varName}
          className="doubleSliderMin"
        />
        <input
          type="range"
          min={props.min}
          max={props.max}
          id={props.varName}
          className="doubleSliderMax"
        />
      </form>
    );
  } else {
    return (
      <form>
        <select>
          <option value={0}>Uniform</option>
          <option value={1}>Random</option>
          <option value={2}>Timed</option>
        </select>
        <input
          type="range"
          min={props.min}
          max={props.max}
          id={props.varName}
          className="doubleSliderMin"
        />
        <input
          type="range"
          min={props.min}
          max={props.max}
          id={props.varName}
          className="doubleSliderMax"
        />
        <input type="number" min="0" max="10" className="time" />
      </form>
    );
  }
};
