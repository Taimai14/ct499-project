<template>
  <Form @submit="submitUser" :validation-schema="userFormSchema">
    <div class="form-group">
      <label for="name">Name</label>
      <Field name="name" type="text" class="form-control" v-model="userLocal.name" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="gender">Gender</label>
      <Field name="gender" type="text" class="form-control" v-model="userLocal.gender" />
      <ErrorMessage name="gender" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Address</label>
      <Field name="address" type="text" class="form-control" v-model="userLocal.address" />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group mb-3">
      <label for="phone">Phone</label>
      <Field name="phone" type="text" class="form-control" v-model="userLocal.phone" />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>
    <div class="form-group mb-3">
      <label for="dob">Date of Birth</label>
      <Field name="dob" type="date" class="form-control" v-model="userLocal.dob" />
      <ErrorMessage name="dob" class="error-feedback" />
    </div>
    <div class="form-group mb-3">
      <label for="password">Password</label>
      <Field name="password" type="password" class="form-control" v-model="userLocal.password" />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary" type="submit" >Save</button>
      <button v-if="userLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteUser">
        Delete
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ['submit:user', 'delete:user'],
  props: {
    user: { type: Object, required: true },
  },
  data() {
    const userFormSchema = yup.object().shape({
      name: yup
        .string()
        .required('Name is required.')
        .min(2, 'Name must be at least 2 characters.')
        .max(100, 'Name can be maximum 100 characters.'),
      gender: yup.string().required('Gender is required.'),
      address: yup.string().required('Address is required.'),
      phone: yup.string().required('Phone number is required.'),
      password: yup.string().required('Password is required.'), 
    });
    return {
      userLocal: { ...this.user },
      userFormSchema,
    };
  },
  methods: {
    submitUser() {
      this.$emit('submit:user', this.userLocal);
    },
    deleteUser() {
      this.$emit('delete:user', this.userLocal._id);
    },
  },
};
</script>
