[
  { id: 'minute', text: 'Minute', value: [] },
  { id: 'hour', text: 'Hour', value: ['minute'] },
  { id: 'day', text: 'Day', value: ['hour', 'minute'] },
  { id: 'week', text: 'Week', value: ['dayOfWeek', 'hour', 'minute'] },
  { id: 'month', text: 'Month', value: ['day', 'dayOfWeek', 'hour', 'minute'] },
  { id: 'year', text: 'Year', value: ['month', 'day', 'dayOfWeek', 'hour', 'minute'] }
]
