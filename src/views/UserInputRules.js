export default {
    nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be at most  10 characters",
      ],
      phonedRules: [
        (v) => !!v || "Phone number - is required",
        (v)=>/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\./0-9]*$/g.test(v)||"Enter valid phone number please",
        (v) => (v && v.length <= 13) || "Phone must be less than 14 characters",
      ],
      emailRules:[
        (v) => !!v || "E-mail is required",
        (v) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v)|| "E-mail must be valid",
      ],
      confirmPasswordRules:[
        v => !!v || "Password  is required",
      v => /\d[a-z][A-Z][!@#$%^&*)(+=._-]/.test(v) || "Enter stronger password",
      v => (v && v.length <= 10) || "Password must at most 10 characters",
      v=>this.password===v||"Password Mismatch"
      ],
      passwordRules:[
        v => !!v || "Password  is required",
        v => /\d[a-z][A-Z][!@#$%^&*)(+=._-]/.test(v) || "Enter stronger password",
        v => (v && v.length <= 10) || "Password must at most 10 characters"
      ],
      addressRules: [
        (v) => !!v || 'Address- is required',
        (v) =>
          (v && v.length <= 10) || 'Address must be less than 10 characters',
      ]
};