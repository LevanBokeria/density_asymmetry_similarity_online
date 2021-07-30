function trial_creator(parameters){
    
    let all_trials = []

    var ref1_idx, ref2_idx

    for (iRep = 0; iRep<parameters.n_reps; iRep++){

        // Flip the ref1 and ref2?
        if (iRep%2==0){
            ref1_idx = 1
            ref2_idx = 2
        } else {
            ref1_idx = 2
            ref2_idx = 1
        }

        for (iT=0; iT<parameters.query.length; iT++){

            let iTrial = {

                query_stimulus: 'img/neck_legs_space/dim_1_stim_' + parameters.query[iT] + '_x_' + parameters.query[iT] + '_y_110.png',
                ref1_stimulus: 'img/neck_legs_space/dim_1_stim_' + parameters['ref'+ref1_idx][iT] + '_x_' + parameters['ref'+ref1_idx][iT] + '_y_110.png',
                ref2_stimulus: 'img/neck_legs_space/dim_1_stim_' + parameters['ref'+ref2_idx][iT] + '_x_' + parameters['ref'+ref2_idx][iT] + '_y_110.png',
                ref1_y_offset: Math.floor((Math.random()-0.5) * 200),
                ref2_y_offset: Math.floor((Math.random()-0.5) * 200),

            }

            all_trials.push(iTrial)
        }

    }

    // Shuffle the array
    all_trials = jsPsych.randomization.shuffleNoRepeats(all_trials,function(a,b){return a.query_stimulus === b.query_stimulus})

    return all_trials
}