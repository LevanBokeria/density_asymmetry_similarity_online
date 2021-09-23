function trial_creator_exposure(n_sessions){
    
    let exemplars = jatos.studySessionData.inputData.exposure_exemplars

    let n_exposure_exemplars = exemplars.length

    // Repeat the exposures exemplars each 5 times, creates an array of 170 exemplars
    let initial_170 = jsPsych.randomization.repeat(exemplars,5)

    // Make sure they don't repeat
    initial_170 = jsPsych.randomization.shuffleNoRepeats(initial_170)

    // Now, for each of the 34, create a doublet and shove it in the array randomly. Do this twice
    let initial_with_reps = JSON.parse(JSON.stringify(initial_170))

    for (iRep=0; iRep<2; iRep++){
        for (iEx=0; iEx<n_exposure_exemplars; iEx++){

            // Take a random location in the initial_170 array
            let rand_idx = Math.ceil(Math.random() * initial_with_reps)

            // Insert the first exemplar back to back here
            initial_with_reps.splice(rand_idx,0,exemplars[iEx])
            initial_with_reps.splice(rand_idx,0,exemplars[iEx])

        }
    }

    // We've now inserted 34*2=68 "same" doublets. We need 85, so do this for 17 more
    let last_17_to_insert = jsPsych.randomization.sampleWithoutReplacement(exemplars,17)
    for (iEx=0; iEx<last_17_to_insert.length; iEx++){

        // Take a random location in the initial_170 array
        let rand_idx = Math.ceil(Math.random() * initial_with_reps)

        // Insert the first exemplar back to back here
        initial_with_reps.splice(rand_idx,0,last_17_to_insert[iEx])
        initial_with_reps.splice(rand_idx,0,last_17_to_insert[iEx])

    }

    // Count n repeats
    var counter = 0
    for (i=1; i<initial_with_reps.length; i++){

        if (initial_with_reps[i] == initial_with_reps[i-1]){
            counter++
        }

    }
    console.log(counter)
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    // Start creating all the trials
    let all_trials = []


    for (iT = 0; iT<initial_with_reps.length; iT++){
        // debugger
        let curr_exemplar = jatos.studySessionData.inputData.exposure_exemplars[initial_with_reps[iT]]

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
            if (initial_with_reps[iT] == initial_with_reps[iT-1]){
                iTrial.correct_response = 'q'
            } else {
                iTrial.correct_response = 'p'
            }
        }

        all_trials.push(iTrial)
    }
    
    // Shuffle the array
    // all_trials = jsPsych.randomization.shuffleNoRepeats(all_trials,function(a,b){return a.query_stimulus === b.query_stimulus})
    // debugger
    var all_sessions = []

    let n_trials_per_session = 50 //all_trials.length/n_sessions

    while(all_trials.length){
        all_sessions[all_sessions.length] = all_trials.splice(0,n_trials_per_session)
    }


    return all_sessions
}