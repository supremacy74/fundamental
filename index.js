const App = {
    data() {
        return {
            list: [],
            types: ['oldest', 'newest', 'ascending', 'descending'],
            title: '',
            description: '',
            substring: '',
            type: '',
            seen: false
        }
    },
    methods: {
        add() {

            if (this.title && this.description) {

                const date = new Date()

                const arguments = [
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds()
                ]

                const object = {
                    index: Math.random(),
                    title: this.title,
                    description: this.description,
                    date: new Date(Date.UTC(...arguments)).toLocaleString('en-US', { hour12: false })
                }

                this.list.push(object)

            }
        },
        remove(index) {
            this.list = this.list.filter(item => item.index !== index)
        },
        show() {
            this.seen = true
        },
        sort(event) {

            this.type = event.target.textContent

            this.seen = false

            const labels = document.querySelectorAll('.label')

            labels.forEach(label => label.classList.remove('selected'))

            event.target.classList.add('selected')

        },
        clear() {
            this.list = []
        }
    },
    computed: {
        sorted() {
            if (this.type === 'ascending') {
                return this.list.sort((first, second) => second.title.localeCompare(first.title))
            } else if (this.type === 'descending') {
                return this.list.sort((first, second) => first.title.localeCompare(second.title))
            } else if (this.type === 'newest') {
                return this.list.sort((first, second) => Date.parse(second.date) - Date.parse(first.date))
            } else if (this.type === 'oldest') {
                return this.list.sort((first, second) => Date.parse(first.date) - Date.parse(second.date))
            } else {
                return this.list
            }
        },
        found() {
            return this.sorted.filter(item => item.title.toLowerCase().includes(this.substring.toLowerCase()))
        }
    }
}


Vue.createApp(App).mount('#app')
