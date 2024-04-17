<template>
  <Form @submit="submitStaff" :validation-schema="staffFormSchema">
    <div class="form-group">
      <label for="name">Staff Name</label>
      <Field name="name" type="text" class="form-control" v-model="staffLocal.name" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="duty">Duty</label>
      <Field name="duty" type="text" class="form-control" v-model="staffLocal.duty" />
      <ErrorMessage name="duty" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Address</label>
      <Field name="address" type="text" class="form-control" v-model="staffLocal.address" />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group mb-3">
      <label for="phone">Phone</label>
      <Field name="phone" type="text" class="form-control" v-model="staffLocal.phone" />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>
    <div class="form-group mb-3">
      <label for="password">Password</label>
      <Field name="password" type="text" class="form-control" v-model="staffLocal.password" />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group">    
      <button class="btn btn-primary" type="submit">Save</button>
      <button v-if="staffLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteStaff">
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
  emits: ['submit:staff', 'delete:staff'],
  props: {
    staff: { type: Object, required: true },
  },
  data() {
    const staffFormSchema = yup.object().shape({
      name: yup
        .string()
        .required('Staff name is required.')
        .min(2, 'Staff name must be at least 2 characters.')
        .max(100, 'Staff name can be maximum 100 characters.'),
      duty: yup.string().required('Duty is required.'),
      address: yup.string().required('Address is required.'),
      phone: yup.string().required('Phone number is required.'),
    });
    return {
      staffLocal: { ...this.staff }, 
      staffFormSchema,
    };
  },
  methods: {
    submitStaff() {
      this.$emit('submit:staff', this.staffLocal);
    },
    deleteStaff() {
      this.$emit('delete:staff', this.staffLocal._id); 
    },
  },
};
</script>
