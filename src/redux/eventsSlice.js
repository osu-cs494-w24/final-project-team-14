import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async () => {
    const response = await fetch('/events.json')
    const data = await response.json()
    return data
  }
)

let currId = 16
const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    status: 'idle',
    error: null, 
    events: [] 
  },
  reducers: {
    addEvent(state, action) {
      const { name, location, date, time, url, lat, long } = action.payload
      state.events.push({
        id: currId++,
        name: name,
        location: location,
        date: date,
        time: time,
        url: url,
        lat: lat,
        long: long
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default eventsSlice.reducer
export const { addEvent } = eventsSlice.actions
