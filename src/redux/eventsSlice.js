import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async () => {
    const response = await fetch('https://lucky-outpost-400621.uw.r.appspot.com/getevents')
    const data = await response.json()
    return data
  }
)

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    status: 'idle',
    error: null, 
    events: [] 
  },
  reducers: {
    addEvent(state, action) {
      const { id, event_name, event_location, event_date, event_time, event_url, event_lan, event_lot } = action.payload;
      const newEvent = {
        id: id,
        name: event_name,
        location: event_location,
        date: event_date,
        time: event_time,
        url: event_url,
        lan: event_lan,
        lot: event_lot
      };
      return {
        ...state,
        events: [...state.events, newEvent]
      };
    },
    getAllEvents(state, action) {
        return action.payload
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
export const selectEvent = state => state.events.events
export const { addEvent, getAllEvents } = eventsSlice.actions
