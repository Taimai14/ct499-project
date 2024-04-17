<template>
  <Form @submit="submitBook" :validation-schema="bookFormSchema">
    <div class="form-group">
      <label for="name">Book Name</label>
      <Field name="name" type="text" class="form-control" v-model="bookLocal.name" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <Field name="price" type="number" class="form-control" v-model="bookLocal.price" />
      <ErrorMessage name="price" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="nxb">Publisher (NXB)</label>
      <select id="nxb" name="nxb" v-model="bookLocal.nxbID" class="form-control">
        <option v-for="publisher in nxb" :key="publisher" :value="publisher._id">
          {{ publisher.name }}
        </option>
      </select>
      <ErrorMessage name="nxb" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="source">Source</label>
      <Field name="source" type="text" class="form-control" v-model="bookLocal.source" />
      <ErrorMessage name="source" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="quantity">Quantity</label>
      <Field name="quantity" type="number" class="form-control" v-model="bookLocal.quantity" />
      <ErrorMessage name="quantity" class="error-feedback" />
    </div>
    <div class="form-group mb-3">
      <label for="year">Year</label>
      <Field name="year" type="number" class="form-control" v-model="bookLocal.year" />
      <ErrorMessage name="year" class="error-feedback" />
    </div>
    
    <div class="form-group">
      <button class="btn btn-primary" @click="submitBook">Save</button>
      <button v-if="bookLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBook">
        Delete
      </button>
    </div>
    
  </Form>
  <!-- <p>Book data: {{ bookLocal }}</p> -->

</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import nxb from '@/services/nxb';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ['submit:book', 'delete:book'],
  props: {
    book: { type: Object, required: true },
    nxb: { type: Array, required: true },

  },
  data() {
    const bookFormSchema = yup.object().shape({
      name: yup
        .string()
        .required('Book name is required.')
        .min(2, 'Book name must be at least 2 characters.')
        .max(100, 'Book name can be maximum 100 characters.'),
      price: yup.number().positive('Price must be positive.').required('Price is required.'),
      nxb: yup.string(),
      source: yup.string().required('Source is required.'),
      number: yup.number().required('number is required.'),
      year: yup.number().positive('Year must be positive.').required('Year is required.'),
    });
    return {
      bookLocal: { ...this.book },
      bookFormSchema,
    };
  },
  methods: {
    submitBook() {
      this.$emit('submit:book', this.bookLocal);
    },
    async deleteBook() {
      this.$emit('delete:book', this.bookLocal._id); 
    },
  },
};
</script>
