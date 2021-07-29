/**
 * jspsych-triplets-keyboard-response
 * Levan Bokeria
 *
 **/


jsPsych.plugins["triplets-keyboard-response"] = (function() {

  var plugin = {};

  // jsPsych.pluginAPI.registerPreload('triplets-keyboard-response', 'stimulus', 'image');

  plugin.info = {
    name: 'triplets-keyboard-response',
    description: '',
    parameters: {
      query_stimulus: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Query Stimulus',
        default: undefined,
        description: 'The query image to be displayed'
      },
      ref1_stimulus: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Ref1 Stimulus',
        default: undefined,
        description: 'The ref1 image to be displayed'
      },
      ref2_stimulus: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Ref2 Stimulus',
        default: undefined,
        description: 'The ref2 image to be displayed'
      },  
      ref1_y_offset: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Ref1 vertical offset',
        default: null,
        description: 'Amount of pixels to offset the ref1 from the center'
      },
      ref2_y_offset: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Ref2 vertical offset',
        default: null,
        description: 'Amount of pixels to offset the ref2 from the center'
      },      
      stimulus_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image height',
        default: null,
        description: 'Set the image height in pixels'
      },
      stimulus_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image width',
        default: null,
        description: 'Set the image width in pixels'
      },
      maintain_aspect_ratio: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Maintain aspect ratio',
        default: true,
        description: 'Maintain the aspect ratio after setting width or height'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEY,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {
    
    // display stimulus as an image element
    var html = '<img src="'+trial.query_stimulus+'" id="jspsych-image-keyboard-response-stimulus">';
    
    // update the page content
    // display_element.innerHTML = html;
    
    // debugger
    // Create an initial div as an arena
    wrapper_arena = document.createElement('div')
    wrapper_arena.id = 'wrapper_arena'
    wrapper_arena.style.height = '700px'
    wrapper_arena.style.width = '700px'
    wrapper_arena.style.border = '1px solid black'


    // Create the ref1 element
    var ref1_img_el = document.createElement('img')

    ref1_img_el.src = trial.ref1_stimulus

    ref1_img_el.className = 'stimuli'
    ref1_img_el.id        = 'ref1_img'

    ref1_img_el.style.height = trial.stimulus_height.toString() + 'px'
    ref1_img_el.style.width  = ref1_img_el.naturalWidth * ref1_img_el.style.height / ref1_img_el.naturalHeight
    ref1_img_el.style['margin-top'] = trial.ref1_y_offset.toString() + 'px'

    wrapper_arena.appendChild(ref1_img_el)    
    
    // Create the query image element
    var query_img_el = document.createElement('img')

    query_img_el.src = trial.query_stimulus

    query_img_el.className = 'stimuli'
    query_img_el.id        = 'query_img'

    query_img_el.style.height = trial.stimulus_height.toString() + 'px'
    query_img_el.style.width  = query_img_el.naturalWidth * query_img_el.style.height / query_img_el.naturalHeight
    query_img_el.style['margin-right'] = '20px'
    query_img_el.style['margin-left'] = '20px'

    wrapper_arena.appendChild(query_img_el)

    // Create the ref2 element
    var ref2_img_el = document.createElement('img')

    ref2_img_el.src = trial.ref2_stimulus

    ref2_img_el.className = 'stimuli'
    ref2_img_el.id        = 'ref2_img'

    ref2_img_el.style.height = trial.stimulus_height.toString() + 'px'
    ref2_img_el.style.width  = ref2_img_el.naturalWidth * ref2_img_el.style.height / ref2_img_el.naturalHeight
    ref2_img_el.style['margin-top'] = trial.ref2_y_offset.toString() + 'px'

    wrapper_arena.appendChild(ref2_img_el)      



    // Add the arena to the display element
    display_element.appendChild(wrapper_arena)

    // store response
    var response = {
      rt: null,
      key: null
    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        rt: response.rt,
        stimulus: trial.stimulus,
        response: response.key
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-triplets-keyboard-response-stimulus').className += ' responded';

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }

    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-triplets-keyboard-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    } else if (trial.response_ends_trial === false) {
      console.warn("The experiment may be deadlocked. Try setting a trial duration or set response_ends_trial to true.");
    }
  };

  return plugin;
})();
