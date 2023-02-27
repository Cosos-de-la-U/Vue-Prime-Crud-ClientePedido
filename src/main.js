import {createApp} from 'vue';

import router from '@/router/router'

import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import App from './App.vue';

import PrimeVue from 'primevue/config';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';

const app = createApp(App);

app.use(PrimeVue);
app.component('ColumnTable', Column);
app.component('DataTable', DataTable);
app.component('PanelTable', Panel);
app.component('MenuBar', Menubar);
app.component('DialogTable', Dialog);
app.component('InputText', InputText);
app.component('ButtonTable', Button);
app.component('ConfirmDialog', ConfirmDialog);
app.component('MessageTable', Message);
app.component('ToastTable', Toast);
app.component('DropDown', Dropdown);
app.component('CalendarTable', Calendar);
app.component('InputMask', InputMask);
app.component('InputNumber', InputNumber);


app.use(ConfirmationService);
app.use(ToastService);
app.use(router)

app.mount('#app')
