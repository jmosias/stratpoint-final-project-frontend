import classes from "./Stepper.module.scss";

function Stepper({ steps, counter }) {
  return (
    <div className={classes.stepper}>
      {steps &&
        steps.map((step, index) => (
          <div
            key={index}
            className={
              classes.step + " " + (counter === index ? classes.active : "")
            }
          >
            <p className={classes.stepNumber}>{index + 1}</p>
            <p className={classes.stepTitle}>{step}</p>
          </div>
        ))}
    </div>
  );
}

export default Stepper;
