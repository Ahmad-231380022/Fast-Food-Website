import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title } from 'chart.js'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title)

export { Chart }

