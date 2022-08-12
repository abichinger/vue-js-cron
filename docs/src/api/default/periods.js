[
  { id: 'minute', value: [] },
  { id: 'hour', value: ['minute'] },
  { id: 'day', value: ['hour', 'minute'] },
  { id: 'week', value: ['dayOfWeek', 'hour', 'minute'] },
  { id: 'month', value: ['day', 'dayOfWeek', 'hour', 'minute'] },
  { id: 'year', value: ['month', 'day', 'dayOfWeek', 'hour', 'minute'] }
]
