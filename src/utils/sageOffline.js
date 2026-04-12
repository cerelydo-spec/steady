// Offline response engine for Sage — keyword-matched, evidence-based post-GLP-1 guidance

const INTENTS = [
  {
    id: 'appetite',
    keywords: ['appetite', 'hunger', 'craving', 'hungry', 'appetite increase', 'more hungry', 'eating more', 'appetite back', 'stopped medication'],
    responses: [
      `The return of appetite after stopping a GLP-1 medication is one of the most commonly reported and genuinely challenging aspects of the post-medication phase. GLP-1 receptor agonists work partly by slowing gastric emptying and modulating hunger signals in the brain — when those effects lift, the physiological hunger drive can feel amplified compared to what you experienced even before starting medication. This is not a failure of willpower; it is appetite recalibration in progress.

The most effective strategy during this period is building meals around protein and fibre before anything else. Research consistently shows that protein has the highest satiety-per-calorie ratio of any macronutrient, and it promotes the release of peptide YY and GLP-1 — your body's own appetite-regulating hormones. Aiming for 25–35 g of protein at each main meal, combined with high-volume vegetables, can meaningfully blunt the intensity of hunger signals.

It also helps to structure eating around consistent times rather than waiting for hunger cues, at least initially. During appetite recalibration, hunger signals are less reliable as guides. Scheduled meals reduce the chance of arriving at a meal in a state of intense hunger, which is when portions tend to expand. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Increased hunger after the post-medication phase is real, measurable, and well-documented — studies tracking patients after GLP-1 discontinuation confirm that appetite-related hormones like ghrelin often rebound. Understanding this as a physiological process rather than a personal shortcoming is genuinely important for how you respond to it.

Practically, the approaches with the strongest evidence for managing appetite without medication are: eating protein first at every meal, including a substantial breakfast to anchor hunger patterns early in the day, minimising ultra-processed foods that are engineered to override satiety signals, and staying well hydrated (thirst is frequently misread as hunger). Volume eating — choosing foods that are large in portion but lower in energy density, like leafy vegetables, cucumbers, and broth-based soups — can also provide real physical fullness.

The recalibration period typically lasts several weeks to a few months, and most people find their appetite settles into a more manageable pattern with consistent structure. Tracking what you eat for a short period — not obsessively, but as data — can help you identify which meals and patterns leave you feeling most satisfied. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Cravings and increased appetite in the post-medication phase often have a strong behavioural component alongside the physiological one. Your brain learned during the medication period that certain foods were less rewarding — that dopamine response to highly palatable food was somewhat muted. As medication clears, reward-driven eating can feel more insistent again, which is why the cravings can feel emotional as much as physical.

One approach that works well for many people is the "protein anchor" technique: before responding to a craving, eat 20–30 g of protein first. This takes around 20 minutes to begin influencing satiety hormones, but it reliably reduces the intensity of subsequent cravings and portion sizes. Pairing this with a brief pause — even five minutes of a different activity — gives the initial hunger spike time to soften. Keeping high-protein, low-effort options readily available (Greek yoghurt, cottage cheese, hard-boiled eggs, edamame) removes the friction when hunger strikes quickly. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'plateau',
    keywords: ['plateau', 'not losing', 'weight stuck', 'same number', 'stalled', 'no progress', 'scale not moving', 'weight not changing'],
    responses: [
      `A weight plateau during the maintenance phase means something quite different from a plateau during active weight loss — and reframing this is important. In maintenance, holding steady at your goal weight is the intended outcome, not a problem to solve. If you are plateaued at a weight above your goal, however, the body is typically in a state of metabolic adaptation where energy expenditure has adjusted downward to match intake.

Metabolic adaptation after significant weight loss is well established in the research. Your resting metabolic rate is lower than a person of the same size who has always been that weight, sometimes by 200–400 calories per day. This means that approaches which worked during active loss may produce no change during maintenance. The most effective levers are incrementally increasing resistance exercise (which is the only intervention shown to partially offset metabolic adaptation over time), reassessing protein intake (protein has a higher thermic effect — it costs more energy to digest), and auditing portion creep, which tends to be gradual and invisible.

Rather than focusing on the scale number, tracking measurements, clothing fit, and energy levels alongside weight gives a more complete picture of body composition changes, which can continue to improve even when scale weight is flat. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Weight plateaus frustrate nearly everyone, and the research on why they happen is actually quite illuminating. When you lose weight, your body reduces its energy output in multiple ways — not just fewer calories burned at rest, but reduced non-exercise activity thermogenesis (the unconscious movement throughout the day), lower body temperature, and increased hunger. These adaptations are a survival mechanism, not a character flaw.

During maintenance, the plateau is often a sign that your body has found a new equilibrium point. Breaking through it — if that is your goal — typically requires a change in stimulus. Introducing or progressing resistance training is particularly effective because muscle tissue is metabolically active and helps raise your resting metabolism. Ensuring adequate sleep (7–9 hours) is also specifically relevant to weight plateaus: poor sleep elevates cortisol and ghrelin, which increases appetite and promotes fat storage regardless of what you eat.

A practical approach is to audit your actual intake for one week using a food tracking app — not as a long-term practice, but as a data-gathering exercise. Most people are surprised to discover calorie intake has crept up gradually through small portions that are easy to underestimate. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'portions',
    keywords: ['portion', 'overeating', 'eating too much', 'portion size', 'too much food', 'overeat', 'portion control'],
    responses: [
      `Portion management without medication-assisted appetite suppression is genuinely one of the harder skills in the post-GLP-1 maintenance phase, and it is worth acknowledging that the medication was doing real physiological work that you now have to replace with habits and structure. The goal is not to eat less through willpower — it is to design your environment and meal patterns so that appropriate portions feel natural.

The most effective structural strategies involve changing the physical setup of eating: using smaller plates (a 9-inch plate instead of a 12-inch plate is associated with 20–25% smaller self-served portions in research), plating food in the kitchen rather than eating family-style where it is easy to serve more, and eating sitting down without screens. These environmental modifications reduce the cognitive load of portion decisions so you are not relying solely on willpower at each meal.

Eating slowly is also directly relevant to portions, because satiety signals take 15–20 minutes to reach the brain from the gut. Strategies that slow the pace of eating — putting utensils down between bites, adding a short pause halfway through a meal — consistently reduce total intake in well-designed studies. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `The relationship between portions and satiety is more nuanced than simple calorie counting, and understanding it can make maintenance feel less like deprivation. Foods vary enormously in their satiety-per-calorie ratio — volume, protein content, fibre, and water content all influence how full a given portion makes you feel. Building meals around high-satiety foods means you can eat satisfying portions without constant internal negotiation.

A practical framework for portions that many maintenance-phase individuals find sustainable is the plate method: half the plate filled with non-starchy vegetables, a quarter with lean protein, and a quarter with a complex carbohydrate. This structure makes portion decisions simpler and automatically biases meals toward protein and fibre. It also removes the mental energy of weighing and measuring, which is difficult to sustain long-term.

Pre-portioning snacks out of their packaging before eating is a simple habit with strong evidence — eating directly from a bag or large container consistently leads to larger portions regardless of hunger level. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'protein',
    keywords: ['protein', 'protein source', 'protein intake', 'protein first', 'how much protein', 'high protein', 'best protein'],
    responses: [
      `Protein is the single most evidence-backed dietary tool for weight maintenance after a significant loss, and this is especially true in the post-medication phase. Protein promotes satiety through multiple mechanisms — it stimulates the release of satiety hormones, has the highest thermic effect of any macronutrient (meaning more calories are used to digest it), and, crucially, it helps preserve the muscle mass you built or retained during your weight loss journey. Muscle tissue is metabolically active, so protecting it directly supports your resting metabolic rate.

General guidance for maintenance-phase adults points to 1.2–1.6 grams of protein per kilogram of body weight per day, with some evidence supporting up to 2 g/kg for those doing significant resistance training. For a practical anchor: aim for 25–40 g of protein at each of your main meals, rather than trying to consume large amounts in one sitting, as the body can only utilise around 25–40 g for muscle protein synthesis per meal.

The most accessible high-quality protein sources are: Greek yoghurt (plain, 17–20 g per 170 g serving), cottage cheese (25 g per cup), eggs (6 g each, easy to pair), chicken breast (31 g per 100 g cooked), canned fish like tuna and sardines (22–25 g per 100 g), edamame (17 g per cup), and tofu or tempeh for plant-based preferences. These are all minimally processed, widely available, and easy to include at any meal. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `The "protein first" eating strategy has a strong evidence base and is particularly well-suited to the post-GLP-1 maintenance phase. The approach is straightforward: at every meal and snack, eat the protein component before moving to carbohydrates. This has been shown to reduce total meal intake, slow the rise in blood glucose (which helps prevent the energy crashes that often drive subsequent cravings), and increase satiety over the following hours.

For plant-based eaters, combining protein sources is important for ensuring adequate amino acid profiles. Effective combinations include: rice with lentils or beans, tofu with edamame, hummus with whole-grain pita, and dairy or eggs with any legume. The key is variety and volume — plant proteins are slightly less bioavailable, so total intake may need to be modestly higher.

Distributing protein across the day is more effective than consuming most of it in one meal. Research on muscle protein synthesis suggests that spreading intake across three or four eating occasions maximises the anabolic stimulus, which helps maintain muscle mass during the maintenance phase. Practically, this means including a protein source at breakfast — something many people skip — which is associated with better appetite regulation throughout the day. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Understanding why protein matters so specifically in your situation can make it easier to prioritise. When you lose significant weight, roughly 25–35% of that loss is typically lean tissue (muscle and bone), even with good nutrition. GLP-1 medications can accelerate this if protein intake was low during the weight loss phase. In maintenance, adequate protein intake is the primary dietary tool for maintaining and rebuilding that lean tissue, which directly influences how efficiently your metabolism works.

The timing of protein around physical activity has additional benefits: consuming 20–40 g of protein within two hours of a resistance training session maximises muscle protein synthesis. This does not require expensive supplements — a cup of Greek yoghurt, three eggs, or a tin of tuna achieves this target easily. Protein supplements like whey or pea protein are a legitimate tool if you consistently struggle to hit protein targets through food alone, but they are not necessary for most people who plan their meals with protein as the anchor. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'regain',
    keywords: ['regain', 'gained weight', 'weight back', 'back on track', 'weight regain', 'gained back', 'put on weight', 'weight coming back'],
    responses: [
      `Weight regain after the post-medication phase is extremely common — clinical data shows that without ongoing intervention, a significant proportion of people who lose weight on GLP-1 medications experience some regain after discontinuation. This is not a personal failure; it reflects the fact that obesity and weight management involve powerful biological mechanisms that work against maintenance. Knowing this framing matters because self-blame tends to produce avoidance, which allows small regains to become larger ones.

The most important thing you can do when you notice regain early is to respond quickly without being harsh. Early course-correction is far more effective than waiting until the regain is significant. Return to basics: audit your protein intake, reassess meal structure, and identify the specific change in habit or circumstance that correlates with the regain. Changes in sleep, stress, a disruption in routine — these are common triggers that are identifiable and addressable.

Behaviorally, one evidence-backed approach is the "two-pound rule" used in weight loss maintenance research: weigh consistently (same time, same conditions) and when weight rises two or more pounds above your maintenance range, immediately apply a short period of more deliberate eating and activity. This prevents drift and removes the psychological burden of constant vigilance. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Getting back on track after some weight regain requires a practical plan rather than a punishing mindset. The research on weight loss maintenance consistently shows that people who maintain successfully are not people who never struggle — they are people who have a plan for what to do when they slip and execute it without extended self-criticism.

A useful re-entry structure is to return to the habits that worked best for you during your initial weight loss: protein-first eating, consistent meal timing, adequate hydration, and daily movement. Adding one or two short resistance training sessions per week is particularly valuable during re-stabilisation, as it shifts body composition favorably even when scale weight is changing slowly. You do not need to redo everything at once — prioritising two or three high-impact habits creates momentum.

It is also worth examining the context of the regain. Was it triggered by a change in routine, a stressful period, a social situation, or gradual portion creep? Understanding the proximate cause allows you to address it specifically rather than applying a generic approach. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'sleep',
    keywords: ['sleep', 'tired', 'fatigue', 'rest', 'insomnia', 'poor sleep', 'not sleeping', 'sleep and weight'],
    responses: [
      `The relationship between sleep and weight maintenance is one of the most well-established and underappreciated areas in metabolic health research. Even a single night of poor sleep (under six hours) measurably elevates ghrelin (the hunger-stimulating hormone) and suppresses leptin (the satiety hormone), leading to approximately 300–500 additional calories consumed the following day in controlled studies — without the person feeling like they are eating more than usual.

Chronically poor sleep also elevates cortisol, which promotes fat storage around the abdomen and increases cravings for high-energy, palatable foods. This creates a cycle: poor sleep increases appetite and cravings, which makes maintenance harder, which can increase stress, which further disrupts sleep. Addressing sleep quality is therefore directly relevant to weight maintenance, not a separate wellness issue.

The most evidence-supported approaches for improving sleep quality are: consistent sleep and wake times (including weekends), avoiding screens for 30–60 minutes before bed, keeping the bedroom cool and dark, limiting caffeine after 1–2 pm, and avoiding large meals within two to three hours of bedtime. If sleep problems are ongoing or severe, a conversation with your healthcare provider about sleep assessment is worthwhile — sleep apnoea, for example, is significantly more common after weight changes and directly impairs metabolic function. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Sleep is a genuine metabolic lever, not just a wellbeing recommendation, and this is especially true during the post-medication maintenance phase. Research from well-designed trials shows that when calorie intake is controlled but sleep is restricted to five to six hours, a much larger proportion of weight loss comes from lean mass rather than fat — meaning poor sleep literally changes your body composition toward less muscle and more fat, even if your weight stays the same.

Beyond the hormonal effects, sleep deprivation impairs decision-making and reduces activity in the prefrontal cortex — the brain region responsible for impulse control and long-term planning. This is why food choices are often noticeably worse after a poor night of sleep; it is not just about willpower, it is about brain function. Recognising this can help you be compassionate with yourself on difficult days while still maintaining the goal of prioritising sleep.

If you are finding sleep difficult, a brief review of sleep hygiene is a good starting point: is your sleep environment optimised, are you getting enough daylight exposure in the morning, and is your evening routine calm and consistent? Even a modest improvement in average sleep quality — from six hours to seven and a half, for example — produces measurable improvements in appetite regulation within one to two weeks. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'stress',
    keywords: ['stress', 'cortisol', 'emotional eating', 'comfort eating', 'anxious', 'anxiety', 'overwhelmed', 'stressed', 'eating emotions'],
    responses: [
      `Stress and weight maintenance have a well-documented and bidirectional relationship that is important to understand in the post-medication phase. Cortisol — the primary stress hormone — is specifically lipogenic, meaning it promotes fat storage, particularly in the abdominal area. It also directly stimulates appetite and increases preference for high-fat, high-sugar foods. This is a biological response, not a character weakness, and it operated long before you began any medication.

Emotional eating — using food to regulate emotional states — is extremely common and is actually functional in the short term: it does reduce stress transiently by activating the brain's reward system. The problem is that it creates a learned association between stress and eating that strengthens over time. Recognising this pattern is the first step to shifting it. A useful self-check before eating in response to a non-meal situation is simply: "Am I physically hungry, or am I seeking relief from something?" This pause alone — without any judgment about the answer — interrupts the automaticity of the response.

Building alternative stress-regulation practices alongside better eating habits is more sustainable than trying to eliminate emotional eating through willpower. Short walks, brief breathwork exercises, physical activity, social connection, and even brief cold exposure have evidence bases for cortisol reduction. The goal is not to eliminate all comfort eating, but to have a menu of tools rather than one. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Comfort eating in response to stress is a pattern that many people in the post-GLP-1 phase find resurfaces as medication effects fade, partly because GLP-1 receptor agonists have some anxiolytic (anxiety-reducing) effects in the brain that are lost on discontinuation. Understanding this can reduce self-blame and prompt more productive responses.

One practical framework for navigating emotional eating is the "HALT" check: before eating outside of a planned meal, pause and ask whether you are Hungry, Angry, Lonely, or Tired. If the answer is one of the latter three, the food is less likely to address the underlying need, and identifying the actual need opens up the possibility of meeting it more directly. This is not about restriction — it is about building a more conscious relationship with eating.

From a nutritional standpoint, certain dietary patterns are associated with better stress regulation: adequate omega-3 fatty acids (from oily fish, walnuts, flaxseed), magnesium (found in dark leafy greens, nuts, seeds), and stable blood sugar throughout the day. Erratic eating patterns and high-sugar meals create blood sugar swings that amplify anxiety and irritability, creating a physiological stress response on top of any psychological one. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'exercise',
    keywords: ['exercise', 'workout', 'movement', 'physical activity', 'gym', 'walking', 'strength training', 'cardio', 'fitness', 'active'],
    responses: [
      `Physical activity in the maintenance phase serves different purposes than during active weight loss, and adjusting your expectations accordingly makes the work more sustainable. During maintenance, the primary goals of exercise are: preserving and building muscle mass (which supports metabolic rate), improving insulin sensitivity (which helps the body manage energy more effectively), reducing stress hormones, and supporting sleep quality. Weight management is a secondary benefit, not the primary mechanism.

Resistance training is particularly important in the post-GLP-1 maintenance context. If muscle mass was lost during the weight loss period, progressive resistance training — starting with bodyweight exercises and gradually adding load — is the most effective way to rebuild it. Even two sessions per week of 20–30 minutes produces measurable improvements in body composition and metabolic function within eight to twelve weeks. This does not require a gym; compound movements like squats, push-ups, lunges, and rows done at home with minimal equipment are effective.

The most important attribute of any exercise programme in the long run is that you can sustain it. An activity you moderately enjoy and do consistently will outperform an optimal programme you abandon after six weeks. Walking is consistently one of the best evidence-backed maintenance-phase activities — it is low-impact, sustainable, and has direct benefits for blood sugar regulation, particularly when done after meals. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Non-exercise activity thermogenesis — the calories burned through all movement that is not deliberate exercise — is actually a larger component of total daily energy expenditure for most people than formal workouts. This includes walking between destinations, standing, fidgeting, and incidental movement throughout the day. Research in weight loss maintenance suggests that people who successfully maintain their weight tend to have significantly higher daily step counts, not necessarily more gym time.

A practical approach that combines both planned and incidental activity: aim for 7,000–10,000 steps per day as a baseline, add two resistance training sessions per week, and include one longer cardiovascular session if tolerated. This is a moderate, sustainable combination that addresses multiple physiological systems relevant to maintenance. Using a phone pedometer or wearable to track steps removes the guesswork and creates a feedback loop that increases daily movement without requiring dedicated workout time.

The post-GLP-1 phase can also be a good time to develop an identity around physical activity rather than just tracking it as a tool. Finding movements you find genuinely enjoyable — whether that is hiking, swimming, yoga, dance, or sport — creates intrinsic motivation that is more durable than external goals. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Starting or returning to exercise after a period of weight loss is a particularly good time to focus on progressive overload in resistance training. When you lose significant weight, some muscle mass is typically lost alongside fat. Rebuilding that muscle through progressive resistance training — gradually increasing the challenge over weeks and months — has compounding benefits: improved body composition, a higher resting metabolic rate, better functional strength, and improved bone density.

You do not need to start intensely. Beginning with two sessions per week of 20–30 minutes, focusing on compound movements that work multiple muscle groups, is sufficient to stimulate meaningful change. Consistency over months matters far more than intensity in any individual session. Working with a qualified personal trainer for even a few sessions to establish technique can help you train safely and progress more efficiently, especially if resistance training is new to you.

Pairing exercise with adequate protein intake amplifies the muscle-building stimulus significantly — this is the most important nutritional consideration for anyone doing resistance training in the maintenance phase. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'motivation',
    keywords: ['motivation', 'struggling', 'hard to stay', 'want to give up', 'maintenance is hard', 'losing motivation', 'no motivation', 'so hard', 'difficult', 'overwhelmed by maintenance'],
    responses: [
      `Maintenance is genuinely one of the hardest phases of the weight management journey, and it is important to acknowledge that without qualification. During active weight loss on GLP-1 medication, many of the biological drivers of appetite and craving were pharmacologically modulated, and the visible progress of the scale moving downward provided consistent feedback and motivation. In maintenance, neither of those supports is present in the same way, and the goal is essentially to hold a difficult position indefinitely.

The research on long-term weight maintenance consistently finds that people who maintain successfully do not do so through greater willpower or motivation — they do so through robust systems and identity. Systems meaning: consistent meal timing, reliable habits, a structured environment that reduces the need for constant decision-making. Identity meaning: thinking of yourself as someone who takes care of their health, for reasons beyond the number on the scale.

If motivation is flagging, a useful recalibration is to reconnect with the reasons maintenance matters to you that go beyond weight — energy levels, physical capability, health markers, the things you can do now that were harder before. Those intrinsic motivators tend to be more durable than aesthetic goals. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `The experience of maintenance being harder than expected is so universal that researchers have a name for it: the "maintenance relapse" pattern, where people achieve their goal and then gradually drift back. Understanding the psychological mechanics of this can help you interrupt it. The brain is wired to pursue goals more strongly than maintain them — once the goal is reached, the dopaminergic drive that powered the pursuit diminishes. This is not failure; it is neuroscience.

One practical response is to set new process-oriented goals rather than outcome goals. Instead of "maintain my weight," goals like "eat protein at every meal this week" or "complete three walks this week" provide the forward momentum that the maintenance state removes. Process goals keep the brain engaged in pursuit rather than simply defending a position.

Community and accountability are underused tools for maintenance. Research consistently shows that people with social support — even one other person with shared goals, or a structured check-in process — maintain their weight more successfully than those working alone. The support does not need to be formal; a friend who asks about your week, a fitness class, or an online community of people in the maintenance phase can all serve this function. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Struggling with maintenance motivation is not a sign that something is wrong with you — it is a sign that you are in the hardest, most under-supported phase of the entire process. The healthcare system, social media, and the diet industry are all oriented toward weight loss; there is very little infrastructure for the equally important work of keeping weight off. If you feel like you are doing this without enough support, that perception is accurate.

Self-compassion is a particularly well-studied tool in the behavioural health literature, and its effects on maintenance outcomes are consistent: people who treat themselves with self-compassion when they experience setbacks are more likely to get back on track quickly and less likely to enter the shame-avoidance cycle that drives prolonged drift. Being harsh with yourself does not work as a motivational strategy; the research is clear on this.

One approach that helps on low-motivation days is to lower the bar deliberately. Instead of the full ideal routine, commit to the minimum effective dose: the one meal you will eat well, the ten-minute walk you will take, the one moment of intentional eating. Meeting a smaller commitment builds the self-efficacy that makes the next day easier. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'medication',
    keywords: ['restart medication', 'go back on', 'glp-1 again', 'back on medication', 'thinking about medication', 'medication question', 'ozempic', 'wegovy', 'mounjaro', 'semaglutide', 'tirzepatide', 'medication decision'],
    responses: [
      `The question of whether to restart a GLP-1 medication is a clinical decision that genuinely requires a conversation with your prescribing healthcare provider, not because it is off-limits to discuss, but because your individual health history, current weight trajectory, metabolic markers, and access to medication all need to be assessed by someone who knows your full picture.

What I can offer is some context on what the research says about re-initiation. Clinical guidelines increasingly recognise GLP-1 medications as treatments for chronic conditions (obesity and type 2 diabetes) rather than short courses, and re-starting after a period of discontinuation is a recognised and studied approach. The medications typically re-establish their effects on appetite and metabolism when reintroduced, often at a lower dose than you ended on. There is no evidence that a period off medication reduces the medication's eventual effectiveness.

If you are considering this option, preparing for a conversation with your provider by tracking your current weight trend, noting specific challenges you are experiencing, and being clear about your goals will make that conversation more productive. Your healthcare provider is the right person to help you weigh this option. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Thinking about restarting GLP-1 medication is a legitimate and common consideration in the post-medication phase, and it is worth examining honestly what is driving the question. Is it that the behavioural strategies feel insufficient? That appetite has returned more intensely than anticipated? That regain has started that you cannot arrest on your own? Each of these represents a different situation with different implications.

GLP-1 medications are increasingly classified by clinical bodies as chronic disease management tools, similar to how blood pressure medication is used — ongoing treatment rather than a fixed course. For many people, the question is not whether they should ever restart but whether this is the right time and whether the support structures are in place to get the most benefit from restarting. Research suggests that people who pair GLP-1 medication with structured behavioural support maintain significantly more weight long-term than those who use medication alone.

Whatever you decide, having a clear plan for behavioural habits that will work alongside medication (or without it) is important. Your healthcare provider is the right person to involve in this decision, and a frank conversation about your experience in the post-medication phase is a good starting point. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'hydration',
    keywords: ['water', 'hydration', 'hydrated', 'how much water', 'drinking water', 'thirsty', 'fluids', 'drink more'],
    responses: [
      `Hydration is a genuinely underrated tool in the post-medication maintenance phase, and its connection to appetite management is well-supported by research. Mild dehydration is very commonly misinterpreted as hunger by the brain — the hypothalamic regions that regulate thirst and appetite overlap significantly, meaning a glass of water before a meal or in response to a craving is a reasonable first response before reaching for food. Studies show that drinking 500 ml of water 30 minutes before a meal reduces meal-time intake measurably.

General hydration guidance for adults is 2–3 litres of fluid per day, with needs increasing meaningfully with exercise, warm weather, or higher body weight. Water, unsweetened tea and coffee, and high-water-content foods (cucumbers, celery, berries, leafy vegetables) all contribute. Thirst is actually a lagging indicator of hydration status — by the time you feel notably thirsty, you are already mildly dehydrated.

Practical ways to build hydration habits: starting each morning with a large glass of water before anything else, keeping a water bottle in your sightline, and drinking a glass before each meal. Flavouring water with cucumber, mint, or a squeeze of citrus increases palatability without adding significant sugar. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Staying well hydrated supports several systems that are directly relevant to weight maintenance. Adequate hydration supports kidney function (which helps process the metabolic byproducts of a higher-protein diet), improves energy and concentration (which supports better decision-making throughout the day), and helps maintain consistent bowel function (which is sometimes affected after GLP-1 discontinuation).

A simple method to assess hydration without tracking: urine colour. Pale yellow is optimal; dark yellow or amber indicates dehydration; colourless is slightly over-hydrated but generally harmless. This gives immediate, reliable feedback without any measurement required.

Caffeinated drinks like coffee and tea do count toward fluid intake despite the mild diuretic effect — research has consistently shown that the fluid in caffeinated beverages more than compensates for the diuretic effect, meaning they contribute positively to hydration. However, sugary drinks including fruit juices are worth minimising, as their caloric density and effect on blood sugar can contribute to the appetite cycles you are working to manage. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'social',
    keywords: ['social', 'restaurant', 'party', 'eating out', 'social eating', 'social situation', 'dinner out', 'friends', 'family meal', 'celebration'],
    responses: [
      `Social eating is one of the most common challenge points for people in the maintenance phase, and it deserves a nuanced response rather than a prescriptive list of rules. Food is deeply social — it is tied to celebration, hospitality, connection, and pleasure — and any maintenance approach that creates significant anxiety around social eating is both unsustainable and counterproductive to wellbeing.

The most effective approaches for restaurant and social eating involve pre-commitment and structure rather than in-the-moment willpower. Before a meal out, reviewing the menu online and identifying a satisfying option that aligns with your maintenance approach removes the pressure of deciding when hungry and surrounded by ambient food cues. Eating a small protein-rich snack before a social event removes the edge of hunger that makes portions expand and alcohol more impactful. Aiming to eat protein first at the meal, and slowing the pace of eating, are habits that translate seamlessly to social settings.

A flexible approach works better than a rigid one for long-term maintenance. One meal that doesn't match your ideal pattern has essentially no effect on your weight trajectory; it's patterns over weeks and months that matter. Choosing a meal you genuinely enjoy socially and not treating it as a failure or needing to compensate is the psychologically healthier approach. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Navigating social situations around food is a skill that takes intentional practice, and most people in the maintenance phase go through a period of recalibrating their social eating patterns. Some strategies that experienced maintainers use: choosing one or two aspects of a meal to enjoy fully rather than trying to moderate everything; offering to contribute a dish to gatherings (so there is definitely something you feel good eating); eating slowly and engaging fully in conversation (which naturally slows the pace of eating); and choosing sparkling water or a single drink rather than multiple alcohol servings, since alcohol specifically impairs the decision-making that makes maintenance habits easier.

Communicating with close friends and family about your maintenance goals — in a matter-of-fact rather than apologetic way — also reduces the social friction around food. Most people are supportive once they understand the context, and fewer people comment on what you're eating than you might anticipate.

It helps to distinguish between situations where you want to be fully flexible (a wedding, a milestone birthday) and situations where you prefer to maintain your usual approach (a regular work lunch). Having this distinction clearly in your own mind reduces the cognitive load of each individual food decision. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'mindful',
    keywords: ['mindful', 'mindful eating', 'eating slowly', 'binge', 'distracted eating', 'eating fast', 'eating in front', 'screen eating', 'binge eating', 'overeating episode'],
    responses: [
      `Mindful eating in the post-GLP-1 maintenance phase is worth approaching as a skill rather than a philosophy — specifically, a set of practices that slow the eating experience and improve your ability to recognise hunger and fullness cues. During the medication phase, these cues were pharmacologically amplified; now you are working to tune into them through attention.

The core practices with the strongest evidence are: eating without screens (television, phone, or computer), which reduces meal intake by 20–30% in controlled studies because distraction delays satiety recognition; eating at a table; putting utensils down between bites; and pausing halfway through a meal to check in with hunger level before continuing. None of these require significant time or effort — they are environmental and behavioural modifications rather than philosophical commitments.

For people who experience episodes of eating past fullness, the "designated eating place" strategy is particularly useful: eating happens only at the kitchen table, nowhere else in the home. This interrupts the automatic association between locations (the sofa, the desk) and eating, which is often stronger than the appetite signal itself. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `If you are experiencing episodes that feel like binge eating — eating large amounts quickly, feeling out of control, eating past the point of fullness and feeling distress afterward — this is worth taking seriously as distinct from general overeating. Binge eating disorder (BED) is the most common eating disorder and is associated with GLP-1 medication use patterns; some research suggests the medication may mask BED symptoms that re-emerge after discontinuation.

If this resonates, raising it with your healthcare provider or a therapist who specialises in eating behaviour is the appropriate step — this is beyond what coaching alone can address effectively, and there are well-validated treatments (particularly cognitive-behavioural therapy and dialectical behaviour therapy) with good outcomes.

For general mindful eating outside of clinical binge eating, the approach of structured meal times, no eating directly from packaging, and using pre-portioned servings provides a behavioural scaffolding that reduces the likelihood of unplanned large eating episodes. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'nutrition',
    keywords: ['what to eat', 'meal planning', 'nutrition', 'what foods', 'healthy eating', 'diet plan', 'food choices', 'meal prep', 'grocery', 'what should i eat'],
    responses: [
      `General nutrition guidance for the post-GLP-1 maintenance phase centres on a few well-supported principles that, when practised consistently, provide significant benefit without requiring rigid tracking. The most important is prioritising protein at every meal — 25–35 g as a target, from sources like eggs, Greek yoghurt, fish, poultry, legumes, and tofu. The second is building meals around vegetables and high-fibre foods, which add volume, slow digestion, and feed the gut microbiome in ways that support satiety hormones. The third is moderating ultra-processed foods, which are specifically engineered to override satiety signals and make portion control much harder.

Meal planning and preparation — even loosely — has a strong evidence base for supporting better food choices and reducing reliance on convenience foods that are typically higher in sodium, sugar, and refined carbohydrates. Practically, this might mean: deciding three or four dinner options for the week on Sunday and buying ingredients for them, batch-cooking a grain and a protein to use across multiple meals, or pre-portioning snacks for the week. The goal is reducing friction at decision points when you are hungry and time-pressed.

A Mediterranean-style eating pattern is the most consistently evidence-backed overall dietary approach for weight maintenance, metabolic health, and long-term wellbeing. It emphasises oily fish, legumes, olive oil, vegetables, whole grains, and nuts — all of which have individual evidence bases and combine into a sustainable, varied eating pattern rather than a rigid prescription. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,

      `Structured meal planning in the maintenance phase works best when it reduces cognitive load rather than creating new pressure. A loose weekly framework — knowing what you will eat for most meals before the week starts — means you are not making food decisions when hungry, when tired, or when convenient food is the easiest option. Research on food decision-making is consistent: decisions made in advance are better aligned with your stated values than decisions made under hunger, time pressure, or stress.

The key nutritional goals for maintenance after significant weight loss are: adequate protein (for lean mass maintenance), adequate fibre (30 g per day as a target, for gut health and satiety), adequate micronutrients (which become more critical when eating at a calorie level near your maintenance threshold rather than in excess), and adequate healthy fats (for satiety, hormone production, and absorption of fat-soluble vitamins).

Foods worth keeping consistently in your regular rotation: oily fish (salmon, sardines, mackerel) two to three times per week, leafy greens daily, legumes (lentils, chickpeas, black beans) several times per week, a handful of mixed nuts daily, and whole grains in place of refined grains wherever possible. These are high-nutrient, high-satiety foods with strong evidence bases that complement rather than compete with each other. Remember, for any clinical concerns or medication decisions, please work with your healthcare provider.`,
    ],
  },
  {
    id: 'fallback',
    keywords: [],
    responses: [
      `That's something I'm ready to help you think through. While I'm running in offline mode right now and working from curated guidance rather than a live conversation, I can offer evidence-based perspectives on most aspects of the post-GLP-1 maintenance phase — appetite management, nutrition, sleep, stress, exercise, social eating, motivation, and the psychological side of this journey.

Could you tell me a little more about what's on your mind? The more specific you can be about what you are experiencing, the more targeted and useful my response can be.`,

      `I want to make sure I give you the most useful response I can. I'm currently operating in offline mode, drawing on curated evidence-based guidance for common post-GLP-1 maintenance questions.

If you can share a bit more detail about what you're navigating — whether it's a specific symptom, a pattern you've noticed, a decision you're facing, or just a general area of concern — I'll do my best to offer something genuinely helpful. Maintenance is a complex phase and most questions deserve a thoughtful answer.`,

      `I'm here to support you through the maintenance phase, even in offline mode. My offline guidance covers the areas most commonly relevant to post-GLP-1 maintenance: appetite recalibration, portion management, protein intake, weight regain, sleep, stress, exercise, motivation, social eating, mindful eating, and general nutrition.

If your question sits in one of those areas, try rephrasing with some of those terms and I'll be able to give you a more specific response. And if you're facing something more clinical or medical in nature, please do bring that to your healthcare provider — they are the right person for those decisions.`,
    ],
  },
]

export function getOfflineResponse(userMessage, messageCount = 0) {
  const lower = userMessage.toLowerCase()

  for (const intent of INTENTS) {
    if (intent.id === 'fallback') continue
    const matched = intent.keywords.some(kw => lower.includes(kw))
    if (matched) {
      const response = intent.responses[messageCount % intent.responses.length]
      return { content: response, isOffline: true }
    }
  }

  // Fallback
  const fallback = INTENTS.find(i => i.id === 'fallback')
  const response = fallback.responses[messageCount % fallback.responses.length]
  return { content: response, isOffline: true }
}
