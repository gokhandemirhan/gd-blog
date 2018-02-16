import Jwt from 'passport-jwt';
import User from '../models/User';
import config from '../config/main';

const JwtStrategy = Jwt.Strategy;
const ExtractJwt = Jwt.ExtractJwt;

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};
