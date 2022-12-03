<template>
    <section @click="(show = true)" class="timeline">
        <div class="range">
            <div class="value" :style="style"></div>
        </div>
        <triangle-modal v-if="show" :cmp="'timelineModal'" :content="'baba'" />
    </section>
</template>

<script>
import triangleModal from '../dynamic-modals/triangle-modal.vue'
export default {
    name: '',
    emits: ['updateTask'],
    props: {
        content: {
            type: Object,
            required: false
        },
        color: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            show: false,
        }
    },
    computed: {
        getTimelineBar() {
            if (!this.content?.start || !this.content?.end) return 0
            const start = (new Date([this.content.start.year, this.content.start.month + 1, this.content.start.day])).getTime()
            const end = (new Date([this.content.end.year, this.content.end.month + 1, this.content.end.day])).getTime()
            const diffInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
            const timeElapsed = Math.ceil((Date.now() - start) / (1000 * 60 * 60 * 24))
            const percentage = (100 * (+timeElapsed) / (+diffInDays))
            return percentage > 100
                ? 100
                : percentage < 0
                    ? 0
                    : percentage
        },
        style() {
            return {
                width: this.getTimelineBar + '%',
                backgroundColor: this.color
            }
        },
    },
    components: {
        triangleModal
    },
}
</script>


const ;
   
  const machine = {
    initial: 'idle',
    states: {
      idle: {
        on: {
          pointerdown: (data, event) => {
            data.firstDate = +event.currentTarget.dataset.day;
            data.secondDate = null;
            return 'dragging';
          }
        }
      },
      dragging: {
        on: {
          pointerover: (data, event) => {
            data.secondDate = +event.currentTarget.dataset.day;
            
            return 'dragging';
          },
          pointerup: 'idle',
          pointercancel: 'idle'
        }
      }
    }
  };
   
  // idle
  let currentState = machine.initial;
   
  function send(event) {
    const transition = machine
      .states[currentState]
      .on[event.type];
   
    if (typeof transition === 'function') {
      currentState = transition(data, event);
      updateDOM();
    } else if (transition) {
      currentState = transition;
      updateDOM();
    }
  }
   
  /* ---------------------------------- */
   
  const allDayEls = document.querySelectorAll('[data-day]');
   
  allDayEls.forEach(dayEl => {
    dayEl.addEventListener('pointerdown', send);
    dayEl.addEventListener('pointerover', send);
  });
   
  document.body.addEventListener('pointerup', send);
   
  /* ---------------------------------- */
   
  function updateDOM(){
    document.querySelectorAll('[data-selected]')
      .forEach(el => {
        delete el.dataset.selected
      });
    
    const startDate = Math.min(data.firstDate, data.secondDate);
    const endDate = Math.max(data.firstDate, data.secondDate);
    
    if ( startDate ) {
      const startDateEl = document.querySelector(`[data-day="${startDate}"]`);
      startDateEl.dataset.selected = "start";
    }
    
    if ( endDate ) {
      const endDateEl = document.querySelector(`[data-day="${endDate}"]`);
      endDateEl.dataset.selected = "end";
    }
  }