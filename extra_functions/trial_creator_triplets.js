function trial_creator_triplets(parameters,n_reps,n_sessions){
    // debugger
    let all_trials = []

    var ref1_idx, ref2_idx

    for (iRep = 0; iRep<n_reps; iRep++){

        // Flip the ref1 and ref2?
        if (iRep%2==0){
            ref1_idx = 1
            ref2_idx = 2
        } else {
            ref1_idx = 2
            ref2_idx = 1
        }
        
        for (iT=0; iT<parameters.length; iT++){

            let correct

            // Whats the "correct" response?
            if (parameters[iT].abs_dist_query_ref1 == parameters[iT].abs_dist_query_ref2){
                correct = null
            } else if (parameters[iT].abs_dist_query_ref1 < parameters[iT].abs_dist_query_ref2){
                if (ref1_idx == 1){
                    correct = 'q'
                } else {
                    correct = 'p'
                }
            } else if (parameters[iT].abs_dist_query_ref1 > parameters[iT].abs_dist_query_ref2){
                if (ref1_idx == 1){
                    correct = 'p'
                } else {
                    correct = 'q'
                }
            }

            let iTrial = {

                query_stimulus: 'img/neck_legs_space/dim_1_stim_' + parameters[iT].query + '_x_' + parameters[iT].query + '_y_110.png',
                ref1_stimulus: 'img/neck_legs_space/dim_1_stim_' + parameters[iT]['ref'+ref1_idx] + '_x_' + parameters[iT]['ref'+ref1_idx] + '_y_110.png',
                ref2_stimulus: 'img/neck_legs_space/dim_1_stim_' + parameters[iT]['ref'+ref2_idx] + '_x_' + parameters[iT]['ref'+ref2_idx] + '_y_110.png',
                ref1_y_offset: Math.floor((Math.random()-0.5) * 200),
                ref2_y_offset: Math.floor((Math.random()-0.5) * 200),
                correct_response: correct,

            }

            all_trials.push(iTrial)
        }

    }
    
    // Shuffle the array
    all_trials = jsPsych.randomization.shuffleNoRepeats(all_trials,function(a,b){return a.query_stimulus === b.query_stimulus})

    var all_sessions = []

    let n_trials_per_session = all_trials.length/n_sessions

    while(all_trials.length){
        all_sessions[all_sessions.length] = all_trials.splice(0,n_trials_per_session)
    }

    return all_sessions

}