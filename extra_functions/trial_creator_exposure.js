function trial_creator_exposure(n_sessions){
    
    // Unique indices of exemplars
    let indices = Array.from(Array(40).keys())

    // Store the final sequence of 400 elements
    let full_array = []

    // Repeate each 40 8 times
    indices_rep8 = jsPsych.randomization.repeat(indices, 4)

    // Repeat 20 of these once again
    indices_rep1 = jsPsych.randomization.repeat(indices.slice(0,20),2)

    full_array.push(...indices_rep8)
    full_array.push(...indices_rep1)

    // Shuffle once again but without repeats!
    full_array = jsPsych.randomization.shuffleNoRepeats(full_array)

    // Now make the reps
    var new_reps_40 = [indices,indices]

    // Transpose
    new_reps_40 = _.zip(...new_reps_40)
    new_reps_40 = [...new_reps_40,...new_reps_40]

    // Now make the reps of the remaining 20
    var new_reps_20 = [indices.slice(0,20),indices.slice(0,20)]

    // Transpose
    new_reps_20 = _.zip(...new_reps_20)    

    // Total reps
    var total_reps = [...new_reps_40,...new_reps_20]

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // Let the sprinkling begin
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    for (iRep=0; iRep<total_reps.length; iRep++){

        // randomly choose index of the full array
        let rand_idx = Math.floor(Math.random() * full_array.length)

        // Insert the reps in the place
        full_array.splice(rand_idx,0,total_reps[iRep][0])
        full_array.splice(rand_idx,0,total_reps[iRep][1])


    }
    
    // Count n repeats
    var counter = 0
    for (i=1; i<full_array.length; i++){

        if (full_array[i] == full_array[i-1]){
            counter++
        }

    }
    console.log(counter)


    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////


    // Start creating all the trials
    let all_trials = []


    for (iT = 0; iT<full_array.length; iT++){
        // debugger
        let curr_exemplar = jatos.studySessionData.inputData.exposure_exemplars[full_array[iT]]

        let iTrial = {

            stimulus: 'img/neck_legs_space/dim_1_stim_' + curr_exemplar + '_x_' + curr_exemplar + '_y_110.png',
            dimension_value: curr_exemplar,
            y_offset: Math.floor((Math.random()) * 200),
            x_offset: Math.floor((Math.random()-0.5) * 300),

        }

        // Whats the correct response on this trial?
        if (iT == 0){
            iTrial.correct_response = null
        } else {
            // Was it repeated?
            if (full_array[iT] == full_array[iT-1]){
                iTrial.correct_response = '1'
            } else {
                iTrial.correct_response = '2'
            }
        }

        all_trials.push(iTrial)
    }
    
    // Shuffle the array
    // all_trials = jsPsych.randomization.shuffleNoRepeats(all_trials,function(a,b){return a.query_stimulus === b.query_stimulus})
    // debugger
    var all_sessions = []

    let n_trials_per_session = all_trials.length/n_sessions

    while(all_trials.length){
        all_sessions[all_sessions.length] = all_trials.splice(0,n_trials_per_session)
    }


    return all_sessions
}