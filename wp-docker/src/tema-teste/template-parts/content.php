<?php

/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<div class="jumbotron">
		<?php
		if (is_single()) :
			the_title('<h1 class="display-3">', '</h1>');
		else :
			the_title('<h2 class="display-3"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>');
		endif;

		if ('post' === get_post_type()) : ?>
			<p class="lead">
				<?php wp_bootstrap_starter_posted_on(); ?>
			</p>
		<?php
		endif; ?>

		<hr class="my-2">
		<div class="post-thumbnail">
			<?php the_post_thumbnail(); ?>
		</div>
		<p><?php if (is_single()) :
				the_content();
			else :
				the_content(__('Continue reading <span class="meta-nav">&rarr;</span>', 'wp-bootstrap-starter'));
			endif;
			?></p>
		<div class="entry-content">
			<?php
			wp_link_pages(array(
				'before' => '<div class="page-links">' . esc_html__('Pages:', 'wp-bootstrap-starter'),
				'after'  => '</div>',
			));
			?>
		</div><!-- .entry-content -->
	</div>
	<footer class="entry-footer">
		<?php wp_bootstrap_starter_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
