function trial_creator(parameters){
    
    let all_trials = []

    for (iRep = 0; iRep<parameters.n_reps; iRep++){

        // Flip the ref1 and ref2?
        if (iRep%2==0){
            var flip_refs = true 
        } else {
            var flip_refs = false
        }

        for (iT=0; iT<parameters.query.length; iT++){

            let iTrial = {

                query_stimulus: 'img/neck_legs_space/dim_1_stim_' + parameters.query[iT] + '_x_' + parameters.query[iT] + '_y_110.png',
                ref1_stimulus: 'img/neck_legs_space/dim_1_stim_' + parameters.ref1[iT] + '_x_' + parameters.ref1[iT] + '_y_110.png',
                ref2_stimulus: 'img/neck_legs_space/dim_1_stim_' + parameters.ref2[iT] + '_x_' + parameters.ref2[iT] + '_y_110.png',
                ref1_y_offset: Math.floor((Math.random()-0.5) * 200),
                ref2_y_offset: Math.floor((Math.random()-0.5) * 200),

            }

            all_trials.push(iTrial)
        }

    }

    // Shuffle the array

    return all_trials
}