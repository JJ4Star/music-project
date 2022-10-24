import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("tos", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);
    defineRule("minVal", minVal);
    defineRule("maxVal", maxVal);
    defineRule("passwords_mismatch", confirmed);
    defineRule("excluded", excluded);
    defineRule("country_excluded", excluded);

    // Custom Error Message
    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alphaSpaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
          email: `The field ${ctx.field} must be a valid email.`,
          minVal: `The field ${ctx.field} is too low.`,
          maxVal: `The field ${ctx.field} is too high.`,
          excluded: `Your are not allowed to use this value for the field ${ctx.field}.`,
          country_excluded: `Due to restrctions, we do not accept users from this location.`,
          passwords_mismatch: "The passwords don't match",
          tos: "You must accept the Terms of Service.",
        };
        
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${context.field} is invalid.`;
    
          return message;
      },
      validateOnBlur: true, // If validation should be triggered on blur event, default is true
      validateOnChange: true, // If validation should be triggered on change event, default is true
      validateOnInput: false, // If validation should be triggered on input event, default is false
      validateOnModelUpdate: true, // If validation should be triggered on update:modelValue (v-model) event, default is true
    });
  },
};
