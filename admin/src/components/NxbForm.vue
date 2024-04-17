<template>
  <Form @submit="submitNxb" :validation-schema="nxbFormSchema">
    <div class="form-group">
      <label for="name">NXB Name</label>
      <Field name="name" type="text" class="form-control" v-model="nxbLocal.name" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group mb-3">
      <label for="address">Address</label>
      <Field name="address" type="text" class="form-control" v-model="nxbLocal.address" />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary" @click="submitNxb">Save</button>
      <button v-if="nxbLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteNxb">
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
  emits: ['submit:nxb', 'delete:nxb'],
  props: {
    nxb: { type: Object, required: true }, 
  },
  data() {
    const nxbFormSchema = yup.object().shape({
      name: yup
        .string()
        .required('NXB name is required.')
        .min(2, 'NXB name must be at least 2 characters.')
        .max(100, 'NXB name can be maximum 100 characters.'),
      address: yup.string().required('Address is required.'),
    });
    return {
      nxbLocal: { ...this.nxb}, 
      nxbFormSchema,
    };
  },
  methods: {
    submitNxb(){
      this.$emit('submit:nxb', this.nxbLocal);
    },
    deleteNxb() {
      this.$emit('delete:nxb', this.nxbLocal._id);
    },
  },
};
</script>
