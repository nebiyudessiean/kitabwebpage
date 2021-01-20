export default {
    nameRules: [
        (v) => !!v || "Name is required",
       ],
      phoneRules: [
        (v) => !!v || "Phone number - is required",
        (v)=>/^09[\d]{8}$/.test(v)||"Enter valid phone number please",
       ],
      emailRules:[
        (v) => !!v || "E-mail is required",
        (v) => /^\w{3,}@\w{2,}\.\w{2,}(\.\w{2})?$/.test(v)|| "E-mail must be valid",
      ],
      confirmPasswordRules:[
        v => !!v || "Password  is required",
      v => /\d[a-z][A-Z][!@#$%^&*)(+=._-]/.test(v) || "Enter stronger password",
      ],
      passwordRules:[
        v => !!v || "Password  is required",
        v => /\d[a-z][A-Z][!@#$%^&*)(+=._-]/.test(v) || "Enter stronger password",
        ],
      addressRules: [
        (v) => !!v || 'Address- is required',
      ]
};