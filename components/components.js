Vue.component('my-checkbox', {
    template: `<div class="checkbox-wrapper" @click="check">
              <div class="title">{{ title }}{{i}}</div>
            </div>`,
    data() {
        return { checked: false, title: 'Check me',i:0 }
    },
    methods: {
        check() { this.i++ }
    }
});
