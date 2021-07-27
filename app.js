Vue.createApp({
  data() {
    return {
      err: [],
      students: [
        {
          id: 1,
          name: 'le van long',
          email: 'levanlong@gmail.com',
          phone: 0868302511,
          gendel: 'male',
        },
        {
          id: 2,
          name: 'le van long2',
          email: 'aasdasdasd@gmail.com',
          phone: 0868302511,
          gendel: 'female',
        },
        {
          id: 3,
          name: 'le van long3',
          email: 'sadasczxczxczxc@gmail.com',
          phone: 0868302511,
          gendel: 'male',
        },
      ],
      std: {
        id: "",
        name: "",
        email: "",
        phone: "",
        gendel: ""
      }
    }
  },
  methods: {
    isValidEmail(email) {
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email) || /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(email);
    },
    validate() {
      this.err = [];
      if (_.isEmpty(this.std.name)) {
        this.err.push('name is not empty');
      }
      if (!_.isEmpty(this.std.name) && (this.std.name.length < 2)) {
        this.err.push('name is not let than 2 charater');
      }
      if (_.isEmpty(this.std.email)) {
        this.err.push('email is not empty');
      }
      if (!_.isEmpty(this.std.email) && !this.isValidEmail(this.std.email)) {
        this.err.push('email is wrong');
      }
      if (_.isEmpty(this.std.phone)) {
        this.err.push('phone is not empty');
      }
      if (!_.isEmpty(this.std.phone) && this.std.phone.length !== 10) {
        this.err.push('phone is 10 charater');
      }
      if (_.isEmpty(this.std.gendel)) {
        this.err.push('gendel is not empty');
      }
      if (this.std.name && this.std.phone && this.std.email && this.std.gendel && this.err.length <= 0) return true
    },
    actionStudent() {
      if (this.std && this.std.id) {
        let objectIndex = this.students.findIndex(e => +e.id === +this.std.id)
        if (this.validate()) {
          this.students[objectIndex] = this.std;
          this.std = {
            id: "",
            name: "",
            email: "",
            phone: "",
            gendel: ""
          };
          return
        } else {
          return false
        }
      }
      let stds = {
        id: "",
        name: this.std.name,
        email: this.std.email,
        phone: this.std.phone,
        gendel: this.std.gendel
      }
      if (this.students.id === 0) {
        stds.id = 1;
      }
      if (this.students.length > 0) {
        let maxId = _.maxBy(this.students, function (item) { return item.id })
        stds.id = maxId.id + 1;
      }
      if (!this.validate()) {
        return false;
      } else {
        this.students.push(stds);
        this.std = {
          id: "",
          name: "",
          email: "",
          phone: "",
          gendel: ""
        };
      }
    },
    deleteStudent(itemDelete) {
      for (let i = 0; i < this.students.length; i++) {
        if (itemDelete.id === this.students[i].id) {
          if (confirm("ban co muon xoa student nay k?")) {
            this.students.splice(i, 1);
          }
        }
      }
    },
    updateStudent(itemUpdate, e) {
      this.std = Object.assign({}, itemUpdate);
    }
  },
}).mount('#app');